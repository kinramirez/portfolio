// Logos come from the Devicon CDN. To use your own file instead, import it and use it as `logo`:
//   import myLogo from "../images/logos/react.svg";
//   { name: "React", logo: myLogo }
// `invert: true` flips a black logo to white so it shows on the dark background.
const devicon = (name, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

export const SKILLS = [
  { name: "HTML5", logo: devicon("html5") },
  { name: "CSS3", logo: devicon("css3") },
  { name: "JavaScript", logo: devicon("javascript") },
  { name: "TypeScript", logo: devicon("typescript") },
  { name: "React", logo: devicon("react") },
  { name: "Tailwind CSS", logo: devicon("tailwindcss") },
  { name: "Sass", logo: devicon("sass") },
  { name: "Framer Motion", logo: devicon("framermotion"), invert: true },
];

export const TOOLS = [
  { name: "Git", logo: devicon("git") },
  { name: "GitHub", logo: devicon("github"), invert: true },
  { name: "VS Code", logo: devicon("vscode") },
  { name: "Vite", logo: devicon("vitejs") },
  { name: "Figma", logo: devicon("figma") },
  { name: "Postman", logo: devicon("postman") },
  { name: "Supabase", logo: devicon("supabase") },
];