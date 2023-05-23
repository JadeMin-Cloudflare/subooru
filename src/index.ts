import { Proxyer } from "./proxyer.ts";

const proxy = new Proxyer("https://booru.sugall.com/");



export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const response = await proxy.fetch(request);
		
		
		return new HTMLRewriter()
			/*.on("article.withleft > section#commentlistimage", {
				element(element) {
					element.remove();
				}
			})*/
			/*.on("img#main_image[src^='https://booru-cdn2.sugall.com/_images/']", {
				element(element) {
					const originSrc = new URL(element.getAttribute('src')!);
					element.setAttribute('src', `${modifiedSrc.hostname}${originSrc.pathname}`);
				}
			})*/
			.on("div#floatingcontrol > a[href]", {
				element(element) {
					const originHref = new URL(element.getAttribute('href')!);
					element.setAttribute('href', `${originHref.pathname}`);
				}
			})
			.transform(response);
	}
} as const;