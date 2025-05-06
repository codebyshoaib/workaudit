import Link from "next/link"
import { ArrowRight, BarChart3, CheckCircle, Globe, Layers, type LucideIcon, Shield, Users } from "lucide-react"
import Button from "@/components/ui/button/Button"
import Image from "next/image"
// import { Button } from "@/components/ui/button"

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Navbar */}
            <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 shadow-sm">
                <div className="container flex h-20 items-center justify-between px-4 md:px-8">
                    {/* Left side: Logo */}
                    <div className="flex items-center gap-2">
                        <Layers className="h-7 w-7 text-primary" />
                        <span className="text-2xl font-bold">Workflow</span>
                    </div>

                    {/* Center: Nav Links */}
                    <nav className="hidden md:flex items-center space-x-8 text-base font-medium text-gray-700">
                        <Link href="#features" className="hover:text-primary transition">
                            Features
                        </Link>
                        <Link href="#solutions" className="hover:text-primary transition">
                            Solutions
                        </Link>
                        <Link href="#testimonials" className="hover:text-primary transition">
                            Testimonials
                        </Link>
                        <Link href="#pricing" className="hover:text-primary transition">
                            Pricing
                        </Link>
                    </nav>

                    {/* Right side: Buttons */}
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="hidden md:block">
                            <Button variant="outline">Dashboard</Button>
                        </Link>
                        <Link href="/signin">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>


            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-muted">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
                            <div className="flex flex-col gap-6">
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                                    Global Project Management, <span className="text-primary">Simplified</span>
                                </h1>
                                <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Manage your software projects across the globe with our comprehensive platform. Real-time updates,
                                    team collaboration, and powerful analytics.
                                </p>
                                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                                    <Link href="/dashboard">
                                        <Button size="md" className="w-full min-[400px]:w-auto">
                                            Go to Dashboard
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href="#demo">
                                        <Button size="md" variant="outline" className="w-full min-[400px]:w-auto">
                                            Watch Demo
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border bg-background md:aspect-square lg:aspect-video p-2">
                                <Image
                                    src="/images/cards/card-03.png"
                                    alt="Dashboard Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                    width={800}
                                    height={600}
                                />
                            </div>

                        </div>
                    </div>
                </section>

                {/* Trusted By Section */}
                <section className="border-t border-b py-12 bg-muted/50">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-center text-xl font-medium text-muted-foreground mb-8">
                            Trusted by leading companies worldwide
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex justify-center">
                                    <div className="h-8 w-32 bg-muted rounded-md"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 md:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    Powerful Features for Global Teams
                                </h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                    Our platform provides everything you need to manage projects across different time zones and
                                    locations.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-8">
                            <FeatureCard
                                icon={Globe}
                                title="Global Collaboration"
                                description="Connect teams across different time zones with real-time updates and communication tools."
                            />
                            <FeatureCard
                                icon={BarChart3}
                                title="Advanced Analytics"
                                description="Track project performance with customizable dashboards and detailed reporting."
                            />
                            <FeatureCard
                                icon={Shield}
                                title="Enterprise Security"
                                description="Keep your data secure with enterprise-grade security features and compliance."
                            />
                            <FeatureCard
                                icon={Users}
                                title="Team Management"
                                description="Organize teams, assign roles, and manage permissions with ease."
                            />
                            <FeatureCard
                                icon={CheckCircle}
                                title="Task Tracking"
                                description="Create, assign, and track tasks with customizable workflows and automation."
                            />
                            <FeatureCard
                                icon={Layers}
                                title="Resource Allocation"
                                description="Optimize resource allocation across projects and teams for maximum efficiency."
                            />
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="solutions" className="py-20 md:py-32 bg-muted/50">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How ProjectSphere Works</h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                    A simple yet powerful workflow designed for software companies managing global projects.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3 md:gap-8">
                            <div className="relative flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    1
                                </div>
                                <h3 className="text-xl font-bold">Plan</h3>
                                <p className="text-center text-muted-foreground">
                                    Create projects, define milestones, and set up teams with our intuitive planning tools.
                                </p>
                            </div>
                            <div className="relative flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    2
                                </div>
                                <h3 className="text-xl font-bold">Execute</h3>
                                <p className="text-center text-muted-foreground">
                                    Manage tasks, track progress, and collaborate with team members in real-time.
                                </p>
                            </div>
                            <div className="relative flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    3
                                </div>
                                <h3 className="text-xl font-bold">Analyze</h3>
                                <p className="text-center text-muted-foreground">
                                    Monitor performance, generate reports, and make data-driven decisions to improve outcomes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-20 md:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Clients Say</h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                    Hear from software companies that have transformed their project management with our platform.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                            <TestimonialCard
                                quote="ProjectSphere has revolutionized how we manage our global development teams. The real-time collaboration features have increased our productivity by 40%."
                                author="Sarah Johnson"
                                role="CTO, TechInnovate"
                            />
                            <TestimonialCard
                                quote="The analytics dashboard gives us insights we never had before. We can now make data-driven decisions that have improved our project delivery times."
                                author="Michael Chen"
                                role="Project Director, GlobalSoft"
                            />
                            <TestimonialCard
                                quote="Security was our main concern when choosing a project management solution. ProjectSphere exceeded our expectations with their enterprise-grade security features."
                                author="Emma Rodriguez"
                                role="Security Officer, SecureDev"
                            />
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-20 md:py-32 bg-muted/50">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, Transparent Pricing</h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                    {"Choose the plan that's right for your team. All plans include access to our core features."}
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
                            <PricingCard
                                title="Starter"
                                price="$29"
                                description="Perfect for small teams just getting started with project management."
                                features={["Up to 10 team members", "5 active projects", "Basic analytics", "Email support"]}
                                buttonText="Get Started"
                                buttonVariant="outline"
                            />
                            <PricingCard
                                title="Professional"
                                price="$79"
                                description="Ideal for growing teams with multiple projects and advanced needs."
                                features={[
                                    "Up to 50 team members",
                                    "Unlimited projects",
                                    "Advanced analytics",
                                    "Priority support",
                                    "Custom workflows",
                                ]}
                                buttonText="Get Started"
                                buttonVariant="primary"
                                highlighted={true}
                            />
                            <PricingCard
                                title="Enterprise"
                                price="Custom"
                                description="Tailored solutions for large organizations with complex requirements."
                                features={[
                                    "Unlimited team members",
                                    "Unlimited projects",
                                    "Custom analytics",
                                    "24/7 dedicated support",
                                    "Custom integrations",
                                    "On-premise options",
                                ]}
                                buttonText="Contact Sales"
                                buttonVariant="outline"
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 md:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center gap-4 text-center rounded-lg border bg-muted/50 p-8 md:p-12">
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    Ready to Transform Your Project Management?
                                </h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                    Join thousands of software companies that have improved their project outcomes with ProjectSphere.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link href="/dashboard">
                                    <Button size="md" className="w-full min-[400px]:w-auto">
                                        Go to Dashboard
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button size="md" variant="outline" className="w-full min-[400px]:w-auto">
                                        Schedule a Demo
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t py-12 md:py-16">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Layers className="h-6 w-6 text-primary" />
                                <span className="text-xl font-bold">ProjectSphere</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Global project management software for modern software companies.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Product</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="#features" className="text-muted-foreground hover:text-foreground">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        Integrations
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        Changelog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Company</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Legal</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        Cookie Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        GDPR
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} ProjectSphere. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">Twitter</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">LinkedIn</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect width="4" height="12" x="2" y="9"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">GitHub</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

interface FeatureCardProps {
    icon: LucideIcon
    title: string
    description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div className="relative flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="p-2 rounded-full bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-center">{title}</h3>
            <p className="text-center text-muted-foreground">{description}</p>
        </div>
    )
}

interface TestimonialCardProps {
    quote: string
    author: string
    role: string
}

function TestimonialCard({ author, role }: TestimonialCardProps) {
    return (
        <div className="relative flex flex-col space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex-1">
                <p className="text-muted-foreground">{"quote"}</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                    <p className="font-medium">{author}</p>
                    <p className="text-sm text-muted-foreground">{role}</p>
                </div>
            </div>
        </div>
    )
}

interface PricingCardProps {
    title: string
    price: string
    description: string
    features: string[]
    buttonText: string
    buttonVariant: "primary" | "outline"
    highlighted?: boolean
}

function PricingCard({
    title,
    price,
    description,
    features,
    buttonText,
    buttonVariant,
    highlighted = false,
}: PricingCardProps) {
    return (
        <div
            className={`relative flex flex-col space-y-6 rounded-lg border p-6 shadow-sm ${highlighted ? "border-primary ring-1 ring-primary" : ""}`}
        >
            {highlighted && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                </div>
            )}
            <div>
                <h3 className="text-2xl font-bold">{title}</h3>
                <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">{price}</span>
                    {price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
            <ul className="space-y-2">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                    </li>
                ))}
            </ul>
            <Link href="/dashboard" className="mt-auto">
                <Button variant={buttonVariant === "primary" ? "primary" : "outline"} className="w-full">
                    {buttonText}
                </Button>
            </Link>
        </div>
    )
}
