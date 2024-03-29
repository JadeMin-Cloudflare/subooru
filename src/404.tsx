import { h } from 'preact';
import { renderToStaticMarkup } from 'preact-render-to-string';
import { DateTime } from 'luxon';



export default function NotFound(requestUrl: URL) {
	const currentTime = DateTime.now().setLocale("ko");

	return renderToStaticMarkup(
		<html lang="ko">
			<head>
				<meta charSet="utf-8"/>
				<title>404 - Not Found</title>
				<style type="text/css">
					{`
						body {
							text-align: center;
						}
						
						table {
							margin-left: auto;
							margin-right: auto;
							border: 1px solid black;
							border-collapse: collapse;
						}
						
						table th, table td {
							border: 1px solid black;
							border-collapse: collapse;
						}
					`}
				</style>
			</head>
			<body>
				<h1>404</h1>
				<p>해당 페이지 또는 기능은 현재 비활성화되어 있습니다.</p>
				<details>
					<summary>Server debug</summary>
					<table>
						<thead>
							<tr>
								<th>Timestamp</th>
								<th>Date/Time</th>
								<th>Request</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{currentTime.toMillis()}</td>
								<td>{currentTime.toFormat("yyyy-MM-dd a h:mm")}</td>
								<td>{requestUrl.pathname}</td>
							</tr>
						</tbody>
					</table>
				</details>
			</body>
		</html>
	);
};