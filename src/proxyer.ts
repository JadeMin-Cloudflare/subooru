import joinUrl from 'url-join';
import NotFound from "./404.html";



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


		if(
			pathname === '/' ||
			pathname.startsWith("/post/list")
		) {
			// 캐시 유지하지 않기 (로딩 속도는 브라우저 캐시에 의존)
			return fetchWithEdgeCaching(0);
		}

		if(
			pathname.startsWith("/home") ||
			pathname.startsWith("/post/view") ||
			pathname.startsWith("/post/next") ||
			pathname.startsWith("/post/prev") ||
			
			pathname.startsWith("/ext") ||
			pathname.startsWith("/data") ||
			pathname.startsWith("/_thumbs") ||
			pathname.startsWith("/_images")
		) {
			// 이미지 뷰어로 접속 시 1년간 캐시 유지
			return fetchWithEdgeCaching(31536000);
		}
		
		// 이외의 모든 요청은 비활성화
		return new Response(NotFound, {
			status: 404,
			headers: {
				"Content-Type": "text/html;charset=UTF-8"
			}
		} as const);
	};
};