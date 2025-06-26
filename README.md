# Next.js Site Boilerplate

This boilerplate provides some basic features that I usually include in my web dev projects out-of-the-box. To be specific, the main things are:

- Scroll snapping and smooth scrolling via CSS and Motion
- Scroll reveal component that allows you to animate almost any element you want
- Internationalization set up
- Responsive design assistance
- Theming set up
- **Extras**

Each of these features can be expanded upon to meet the specific needs of any given project. I'll explain some of these features in depth next.

### Scroll Snapping

This is mainly handled by the **SectionWrapper** component. It takes in **Section** components as children and fits their collective height while treating the top of each section as a snapping point.

Here's the component breakdown in a bit more detail:

```tsx
import { SectionWrapper, Section } from "@/components";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function MyPage() {
  return (
    <SectionWrapper
      enableScrollSnap={true} // controls the snapping effect
      showNavigation={true} // Shows/hides navigation indicator dots
      navigationPosition="end" // Positions the navigation indicator dots in relation to the left
      onSectionChange={handleChange} // If you want to fire off events as the user changes sections
      debug={false} // Shows/hides a debug grid that represents the UI grid layer of the project
    >
      {/* Section component that acts as a parent to your content*/}
      <Section id="hero" minHeight="100vh" textAlignment="center">
        <ScrollReveal animation="fade" direction="up-down">
          <h1>Welcome to My Site</h1>
        </ScrollReveal>
      </Section>

      <Section id="about" minHeight="100vh">
        <ScrollReveal animation="mask" direction="left-right">
          <p>About content here...</p>
        </ScrollReveal>
      </Section>
    </SectionWrapper>
  );
}
```

Both the **Section** and **SectionWrapper** components can be modified either via adding classnames to them or by manually going into their code and tweaking things to your liking. Make sure to look at the actual component code for more info on their props and functionality

**_Note: Each section is designed to have the ability to be any height without breaking the section wrapper. Make sure to adjust the min height and height props to take advantage of this!_**

### Scroll Reveal Animations

These are mostly handled by the **ScrollReveal** component. It takes react nodes as children and wraps them in motion divs that have some premade animations on them. Here's an example:

```tsx
<ScrollReveal
  animation="fade" // Defaults are fade and mask(clip path animation)
  direction="up-down" // The direction the animation begins and ends at
  duration={0.8}
  ease={[0.87, 0, 0.13, 1]}
  delay={0}
>
  <h1 className="text-6xl font-bold mb-6">{t("hero.title", "Welcome")}</h1>
</ScrollReveal>
```

You can extend the component to have more animations and stuff by going into it and adding more animation variants.

**_Note: The component functions by using the intersection observer under the hood. To adjust things like thresholds for when animations play, visit the hook file and tweak that in tandem with the component!_**

### Internationalization

Internationalization is handled in a more manual way compared to dedicated packages and whatnot. To start, there's a `language.ts` file that contains all of the info on languages the site will support and how to flag them:

```ts
export type SupportedLanguage = "en" | "ja";

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface TranslationKeys {
  // Navigation
  home: string;
  about: string;
  services: string;
  contact: string;

  // Common UI
  loading: string;
  error: string;
  success: string;
  close: string;
  submit: string;
  cancel: string;

  // Sections (can be extended per template)
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };

  // Add more nested keys as needed for different templates
  [key: string]: any;
}

export interface LanguageStore {
  currentLanguage: SupportedLanguage;
  availableLanguages: LanguageOption[];
  translations: Record<SupportedLanguage, TranslationKeys>;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string; // If translations can't be loaded, use a fallback
  loadTranslations: (language: SupportedLanguage) => Promise<void>;
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
  },
];
```

Then, you go into the language store and set up the actual text values like this:

```ts
export const useLanguageStore = create<ExtendedLanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: "en",
      availableLanguages: AVAILABLE_LANGUAGES,
      isHydrated: false, // Add hydration tracking
      translations: {
        en: {
          home: "Home",
          about: "About",
          services: "Services",
          contact: "Contact",
          loading: "Loading...",
          error: "Error",
          success: "Success",
          close: "Close",
          submit: "Submit",
          cancel: "Cancel",
          hero: {
            title: "Welcome",
            subtitle: "Build something amazing",
            cta: "Get Started",
          },
        },
        ja: {
          home: "ホーム",
          about: "私たちについて",
          services: "サービス",
          contact: "お問い合わせ",
          loading: "読み込み中...",
          error: "エラー",
          success: "成功",
          close: "閉じる",
          submit: "送信",
          cancel: "キャンセル",
          hero: {
            title: "ようこそ",
            subtitle: "素晴らしいものを作りましょう",
            cta: "始める",
          },
        },
      },
      //...rest of store
```

How this system works is by switching between pre-defined translations that you or your translators set up. You define the structure of your site's text in the `TranslationKeys` interface, and then set up the language codes, names, native names, and flags, in the `AVAILABLE_LANGUAGES` constant. When you set up the structure for your site's text, _you mirror that structure in the language store with the actual string values_. The structure that's in this boilerplate is pretty basic, but you could make a structure that makes more sense like this:

```ts
export interface TranslationKeys {
site: {
    homePage: {
        heroSection: {
            greeting: string;
            catchPhrase: string;
        },
        featuredProductsSection: {
            header: string;
            description: string;
        }
    }
    productPage: {...}
    checkoutPage: {...} // you get the idea
}
}
```

I'm still debating on whether or not I should handle the translation of external text like listings from a db in this boilerplate or not, but for now I think leaving it up to the developer is best, so while this basic system isn't perfect by any means, it does allow you to translate all of the text that you know is gonna be on your site. You could just delete all of the internationalization and use something like i18n if you wanted, but I personally don't like the bloat that comes with the package and it's somewhat complicated setup(I'm a noob), so I opt for a lightweight option like this.

### Responsive Design

Now this is a huge pain for most devs, me included. Instead of trying to make a complex and comprehensive set of built-in components, I decided to make a complex hook that detects the viewport size of the client user's device, this way you get to set up some conditional rendering for components based on javascript data as opposed to TailwindCSS breakpoints. You could use both to really up the level of control you get if you wanted too. Here's an example of the hook in action:

```tsx
//...
// Get viewport info for responsive behavior
const { isMobile } = useViewport();

let someValue = isMobile ? "Mobile value" : "Desktop value";
```

You can see a full list of the booleans this hook returns in the actual hook file. I mainly designed this because there were several times when I made something that I thought was responsive, only to find out that it breaks on old android phones or a 1920 x 1080 pixel displays or something. The hook should hopefully help catching mistakes like that.

### Theming

Last but not least, the theme system. It's pretty straightforward. You set up your default theme colors and font structure in the `theme.ts` file:

```ts
export interface ThemeData {
  name: string;
  typeFaceClass: string;
  typeFaceName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
}

// Font configuration with display names and CSS classes
// Make sure that you create corresponding classnames in
// the global css file! Import the fonts you want to use!
export const AVAILABLE_FONTS = [
  { name: "Inter", className: "font-inter" },
  { name: "Roboto", className: "font-roboto" },
  { name: "Open Sans", className: "font-open-sans" },
  { name: "Lato", className: "font-lato" },
  { name: "Montserrat", className: "font-montserrat" },
  { name: "Source Sans Pro", className: "font-source-sans" },
  { name: "Raleway", className: "font-raleway" },
  { name: "Nunito", className: "font-nunito" },
  { name: "Poppins", className: "font-poppins" },
  { name: "Playfair Display", className: "font-playfair" },
] as const;

export interface ThemeStore {
  currentTheme: ThemeData;
  availableThemes: Record<string, ThemeData>;
  availableFonts: typeof AVAILABLE_FONTS;
  setTheme: (themeName: string) => void;
  updateTheme: (updates: Partial<ThemeData>) => void;
  setFont: (fontClassName: string) => void;
  cycleFont: () => void;
}

// Clean, simple default themes
export const DEFAULT_THEMES: Record<string, ThemeData> = {
  light: {
    name: "light",
    typeFaceClass: "font-inter",
    typeFaceName: "Inter",
    primaryColor: "#000000",
    secondaryColor: "#D3D3D3",
    accentColor: "#0066cc",
    backgroundColor: "#ffffff",
    foregroundColor: "#000000",
  },
  dark: {
    name: "dark",
    typeFaceClass: "font-inter",
    typeFaceName: "Inter",
    primaryColor: "#ffffff",
    secondaryColor: "#cccccc",
    accentColor: "#4d9eff",
    backgroundColor: "#1a1a1a",
    foregroundColor: "#ffffff",
  },
};
```

Then use the theme store to set up the themes for the site and persist them in local storage. That's pretty much it. The page is wrapped in a theme provider that ensures the custom css variables created by the theme store get applied to any given set of pages without manual set up.

# Extra Notes

### UI Elements

The **SectionWrapper** component is actually pretty smart and has a UI element filtering system too. If you want to place modals, nav buttons, or any kind of fixed elements on the screen, you can use the **UIElement** component to wrap that content and then put that in the section wrapper like this:

```tsx
import { SectionWrapper, Section } from "@/components";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function MyPage() {
  return (
    <SectionWrapper
      enableScrollSnap={true} // controls the snapping effect
      showNavigation={true} // Shows/hides navigation indicator dots
      navigationPosition="end" // Positions the navigation indicator dots in relation to the left
      onSectionChange={handleChange} // If you want to fire off events as the user changes sections
      debug={false} // Shows/hides a debug grid that represents the UI grid layer of the project
    >
      {/* Section component that acts as a parent to your content*/}
      <Section id="hero" minHeight="100vh" textAlignment="center">
        <ScrollReveal animation="fade" direction="up-down">
          <h1>Welcome to My Site</h1>
        </ScrollReveal>
      </Section>

      <Section id="about" minHeight="100vh">
        <ScrollReveal animation="mask" direction="left-right">
          <p>About content here...</p>
        </ScrollReveal>
      </Section>

      {/* The UIElement props are the component's position in relation to the UI grid container */}
      {/* and its layer hierarchy: background -> content -> navigation -> overlay*/}

      <UIElement layer="navigation" zone="top-right">
        <MenuIcon />
      </UIElement>
    </SectionWrapper>
  );
}
```

You can see the specifics of how the grid and ui elements work by checking out their code!

### Testing

The boilerplate includes comprehensive testing components:

```bash
# Access testing components at:
/tests/store-testing-demo    # Test all store functionality
/tests/font-cycling-test     # Test font loading and cycling
```

You can also navigate to localhost:3000/tests or click the little test tube icon on the bottom left of the screen.

If you want to remove all test content, just simply delete the tests folder and you're all set.

### Page Transitions

This boilerplate also comes with page transition animations using framer motion. The system is sorta simple. I wrap the entire page in a transition provider like this:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/components/providers/ThemeProvider";
import { PageTransitionProvider } from "./components/providers/PageTransitionProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <PageTransitionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
```

The provider reads from the `transitionVariants.ts` file to determine what animation and timing to use. There are more extensive notes in the files if you want to see how it really works, but on a basic level, the provider wraps it's children in a motion div and animate presence so that we can wait for entrance and exit animations on route change.

## 🛠 Built With

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

## 📝 License

This project is licensed under the MIT License

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💫 Credits

Built with ❤️ for modern web development. I'm still new to collaborative coding and github stuff, so there might be some things I don't get right. Regardless, I hope this code is useful to someone out there to some capacity.
