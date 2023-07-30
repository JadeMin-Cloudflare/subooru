import { h } from 'preact';
import { renderToStaticMarkup } from 'preact-render-to-string';
import { DateTime } from 'luxon';



export default function NotFound() {
	return renderToStaticMarkup(
		<html lang="ko">
			<head>
				<meta charSet="utf-8"/>
				<title>404 - Not Found</title>
			</head>
			<body style="text-align: center;">
				<h1>404</h1>
				<p>해당 페이지 및 기능은 현재 비활성화되어 있습니다.</p>
				<footer>
					{DateTime.now().toFormat("yyyy-MM-dd a HH:mm")}
				</footer>
			</body>
		</html>
	);
};