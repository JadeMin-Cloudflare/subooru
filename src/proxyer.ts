import joinUrl from "url-join";



export class Proxyer {
	public originUrl: string;
	public constructor(originUrl: string) {
		this.originUrl = originUrl;
	};

	public async fetch(request: Request): Promise<Response> {
		const { pathname, search } = new URL(request.url);
	
		const fetchWithEdgeCaching = (cacheTtl: number): Promise<Response> => {
			return fetch(joinUrl(this.originUrl, pathname, search), {
				...request,
				cf: {
					cacheEverything: true,
					cacheTtl
				}
			});
		};


		if(pathname.startsWith("/home") || pathname.startsWith("/post/list")) {
			// 캐시하지 않기
			return fetchWithEdgeCaching(0);
		}
		if(pathname.startsWith("/post/view")) {
			// 이미지 뷰어로 접속 시 1년간 캐시 유지
			return fetchWithEdgeCaching(31536000);
		}
		// 이외의 모든 요청은 7일간 캐시 유지
		return fetchWithEdgeCaching(604800);
	};
};