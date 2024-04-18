import Container from '@/components/container'
import Footer from '@/components/footer'
import Header from '@/components/header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Evento',
	description: 'Browse and create events',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body
				className={`${inter.className} bg-gray-950 text-white overflow-y-scroll`}
			>
				<Container>
					<Header />
					{children}
					<Footer />
				</Container>
			</body>
		</html>
	)
}
