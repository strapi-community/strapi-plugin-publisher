import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import { pluginId } from './pluginId';
import Initializer from './components/Initializer';
import ActionManager from './components/ActionManager';

const name = pluginPkg.strapi.name;

export default {
	register(app) {
		app.registerPlugin({
			id: pluginId,
			initializer: Initializer,
			isReady: false,
			name,
		});
	},

	bootstrap(app) {
		app.injectContentManagerComponent('editView', 'informations', {
			name: name,
			Component: ActionManager,
		});
	},

	async registerTrads({ locales }) {
		const importedTrads = [];

		for (const locale of locales) {
			try {
				const data = await import(`./translations/${locale}.json`);
				importedTrads.push({
					data: prefixPluginTranslations(data, pluginId),
					locale,
				});
			} catch (error) {
				importedTrads.push({ data: {}, locale });
			}
		}

		return importedTrads;
	},
};
