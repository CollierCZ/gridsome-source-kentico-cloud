const DeliveryClient = require('./GridsomeDeliveryClient');
const KenticoCloudSource = require('./KenticoCloudSource');
const GridsomeContentItemFactory = require('./GridsomeContentItemFactory');
const GridsomeContentItem = require('./GridsomeContentItem');
const GridsomeTaxonomyItemFactory = require('./GridsomeTaxonomyItemFactory');
const Logger = require('./Logger');

class KenticoCloudSourcePlugin {
  static defaultOptions() {
    return {
      deliveryClientConfig: {
        projectId: '',
        contentItemsDepth: 3
      },
      contentItemConfig: {
        contentItemTypeNamePrefix: '',
        assetTypeName: 'Asset',
        itemLinkTypeName: 'ItemLink',
        contentItems: {},
        routes: {},
        richText: {
          wrapperCssClass: 'rich-text',
          componentNamePrefix: '',
          componentSelector: 'p[data-type="item"]',
          itemLinkComponentName: 'item-link',
          itemLinkSelector: 'a[data-item-id]',
          assetComponentName: 'asset',
          assetSelector: 'figure[data-asset-id]'
        }
      },
      taxonomyConfig: {
        taxonomyTypeNamePrefix: 'Taxonomy',
        routes: {}
      }
    }
  };

  constructor(api, options) {
    const logger = new Logger('gridsome-source-kentico-cloud');

    api.loadSource(async store => {
      const deliveryClient = new DeliveryClient(options.deliveryClientConfig);
      const contentItemFactory = new GridsomeContentItemFactory(options.contentItemConfig);
      const taxonomyItemFactory = new GridsomeTaxonomyItemFactory(options.taxonomyConfig);

      const kenticoCloudSource = new KenticoCloudSource(
        deliveryClient,
        contentItemFactory,
        taxonomyItemFactory,
        logger
      );

      logger.log('Started loading content from Kentico Cloud');

      await kenticoCloudSource.load(store);

      logger.log('Finished loading content from Kentico Cloud');
    });
  }
}

module.exports = KenticoCloudSourcePlugin;
module.exports.GridsomeContentItem = GridsomeContentItem;
