import './globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}

export const metadata = {
	title: 'Orga Next Example',
	description: 'Minimal Next.js example for @orgajs/next',
}
