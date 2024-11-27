import type { Config } from '~/src/utils/get-config'
import type { Transformer } from '~/src/utils/transformers'

export const transformImport: Transformer = async ({ sourceFile, config }) => {
   const importDeclarations = sourceFile.getImportDeclarations()

   for (const importDeclaration of importDeclarations) {
      const moduleSpecifier = updateImportAliases(
         importDeclaration.getModuleSpecifierValue(),
         config,
      )

      importDeclaration.setModuleSpecifier(moduleSpecifier)

      // Replace `import { ny } from "~/lib/utils"`
      // eslint-disable-next-line eqeqeq
      if (moduleSpecifier == '~/lib/utils') {
         const namedImports = importDeclaration.getNamedImports()
         const nyImport = namedImports.find(i => i.getName() === 'ny')
         if (nyImport) {
            importDeclaration.setModuleSpecifier(
               moduleSpecifier.replace(/^~\/lib\/utils/, config.aliases.utils),
            )
         }
      }
   }

   return sourceFile
}

function updateImportAliases(moduleSpecifier: string, config: Config) {
   // Not a local import.
   if (!moduleSpecifier.startsWith('~/')) {
      return moduleSpecifier
   }

   // Not a registry import.
   if (!moduleSpecifier.startsWith('~/registry/')) {
      // We fix the alias an return.
      const alias = config.aliases.components.charAt(0)
      return moduleSpecifier.replace(/^~\//, `${alias}/`)
   }

   if (moduleSpecifier.match(/^~\/registry\/(.+)\/ui/)) {
      return moduleSpecifier.replace(
         /^~\/registry\/(.+)\/ui/,
         config.aliases.ui ?? `${config.aliases.components}/ui`,
      )
   }

   if (
      config.aliases.components
      && moduleSpecifier.match(/^~\/registry\/(.+)\/components/)
   ) {
      return moduleSpecifier.replace(
         /^~\/registry\/(.+)\/components/,
         config.aliases.components,
      )
   }

   if (config.aliases.lib && moduleSpecifier.match(/^~\/registry\/(.+)\/lib/)) {
      return moduleSpecifier.replace(
         /^~\/registry\/(.+)\/lib/,
         config.aliases.lib,
      )
   }

   if (
      config.aliases.hooks
      && moduleSpecifier.match(/^~\/registry\/(.+)\/hooks/)
   ) {
      return moduleSpecifier.replace(
         /^~\/registry\/(.+)\/hooks/,
         config.aliases.hooks,
      )
   }

   return moduleSpecifier.replace(
      /^~\/registry\/[^/]+/,
      config.aliases.components,
   )
}
