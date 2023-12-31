---
to: tsconfig.json
---
{
  "include": [".web/remix.env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["dist"],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2019"],
    "isolatedModules": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "target": "ES2019",
    "strict": true,
    "allowJs": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "strictPropertyInitialization": false,
    "emitDecoratorMetadata": true,
    "baseUrl": ".",

    // Remix takes care of building everything in `remix build`.
    "noEmit": true
  }
}
