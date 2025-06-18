# Next.js Site Boilerplate

This boilerplate provides some basic features that I usually include in my web dev projects out-of-the-box. To be specific, the main things are:

- Scroll snapping and smooth scrolling via CSS and Motion
- Scroll reveal component that allows you to animate almost any element you want
- Internationalization set up
- Responsive design assistance
- Theming set up

Each of these features can be expanded upon to meet the specific needs of any given project. I'll explain some of these features in depth next.
---

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

***Note: Each section is designed to have the ability to be any height without breaking the section wrapper. Make sure to adjust the min height and height props to take advantage of this!***

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

***Note: The component functions by using the intersection observer under the hood. To adjust things like thresholds for when animations play, visit the hook file and tweak that in tandem with the component!***

### Internationalization


