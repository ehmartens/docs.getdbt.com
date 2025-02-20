const fs = require('fs')
const yaml = require('js-yaml')
const slugify = require('slugify')

// Pass custom data to blog
module.exports = function buildGlobalDataPlugin(context, options) {
  return {
    name: 'docusaurus-build-global-data-plugin',
    async loadContent() {

      // Get all tags and build slug for tag
      const tagArr = yaml.load(fs.readFileSync(`blog/categories.yml`, { encoding: 'utf8' }))
      const tagData = tagArr.map(tag => {
        tag.slug = slugify(tag.name)
        return tag
      })

      // Get custom blog metadata
      const blogMeta = yaml.load(fs.readFileSync(`blog/metadata.yml`, { encoding: 'utf8' }))
      
      // Get CTA data
      const CTAData = yaml.load(fs.readFileSync(`blog/ctas.yml`, { encoding: 'utf8' }))
      
      // Get versionedPages param
      // This controls versioning for sidebar
      const { versionedPages } = options
      
      return {
        tagData,
        blogMeta,
        CTAData,
        versionedPages
      }
    },
    async contentLoaded({content, actions}) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  }
}
