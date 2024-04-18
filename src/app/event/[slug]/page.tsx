import notFound from '@/app/not-found'
import H1 from '@/components/h1'
import { getEvent } from '@/lib/server-utils'
import { Metadata } from 'next'
import Image from 'next/image'

type Props = {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const slug = params.slug
	const event = await getEvent(slug)

	return {
		title: event ? event.name : 'Event not found',
	}
}

export async function generateStaticParams() {
	// top 100 most popular events
	return [
		{
			slug: 'dj-practice-session',
		},
		{
			slug: 'yoga-in-the-park',
		},
	]
}

export default async function EventPage({ params }: Props) {
	const slug = params.slug
	const event = await getEvent(slug)

	if (!event) {
		return notFound()
	}

	return (
		<main>
			<section className=' relative  flex justify-center items-center  overflow-hidden py-14 md:py20'>
				<Image
					src={event.imageUrl}
					className='object-cover blur-3xl z-0'
					alt='Event Image'
					fill
					quality={50}
					sizes='(max-width: 1280px) 100vw ,1280px'
					priority
				/>

				<div className=' z-1 gap-6 lg:gap-16 flex flex-col   lg:flex-row relative'>
					<Image
						src={event.imageUrl}
						alt='Event Image'
						width={300}
						height={201}
						className='rounded-xl border-2 border-white/50 object-cover'
					/>
					<div className='flex flex-col '>
						<p className=' text-white/75'>
							{new Date(event.date).toLocaleDateString('en-US', {
								weekday: 'long',
								month: 'long',
								day: 'numeric',
							})}
						</p>

						<H1 className=' mb-2 mt-1 whitespace-nowrap lg:text-5xl'>
							{event.name}
						</H1>
						<p className=' whitespace-nowrap  text-xl text-white/75'>
							Organized by
							<span className=' italic'>{event.organizerName}</span>
						</p>

						<button className=' bg-white/20 text-lg capitalize w-[95vw] mt-5 lg:mt-auto rounded-md border-white/10 border-2 bg-blur sm:w-full py-2 state-effects '>
							Get tickets
						</button>
					</div>
				</div>
			</section>

			<div className=' min-h-[75vh] text-center px-5 py-16'>
				<Section>
					<SectionHeading>About this event</SectionHeading>
					<SectionContent>{event.description}</SectionContent>
				</Section>

				<Section>
					<SectionHeading>Location</SectionHeading>
					<SectionContent>{event.location}</SectionContent>
				</Section>
			</div>
		</main>
	)
}

function Section({ children }: { children: React.ReactNode }) {
	return <section className=' mb-12 '>{children}</section>
}

function SectionHeading({ children }: { children: React.ReactNode }) {
	return <h2 className=' text-2xl mb-8'>{children}</h2>
}

function SectionContent({ children }: { children: React.ReactNode }) {
	return (
		<p className=' max-w-4xl text-lg mx-auto leading-8  text-white/75'>
			{children}
		</p>
	)
}
