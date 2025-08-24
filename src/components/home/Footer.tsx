"use client";

import { Briefcase } from "lucide-react";

const Footer = () => {
    return (
        <footer id="contact" className="bg-accent-foreground text-primary-foreground py-12 px-4">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Briefcase className="h-6 w-6" />
                            <h4 className="text-xl font-bold">Jobify</h4>
                        </div>
                        <p className="text-primary-foreground/80 font-[var(--font-source-sans)]">
                            Connecting talent with opportunity, one job at a time.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-4">For Job Seekers</h5>
                        <ul className="space-y-2 text-primary-foreground/80 font-[var(--font-source-sans)]">
                            <li>
                                <a href="#" className="hover:text-primary-foreground transition-colors">
                                    Browse Jobs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-foreground transition-colors">
                                    Career Advice
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-foreground transition-colors">
                                    Resume Builder
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-4">For Employers</h5>
                        <ul className="space-y-2 text-primary-foreground/80 font-[var(--font-source-sans)]">
                            <li>
                                <a href="#" className="hover:text-primary-foreground transition-colors">
                                    Post Jobs
                            </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-foreground transition-colors">
                                    Find Talent
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-foreground transition-colors">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-4">Company</h5>
                        <ul className="space-y-2 text-primary-foreground/80 font-[var(--font-source-sans)]">
                            <li>
                                <a href="#" className="hover:text-primary-foreground transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-foreground transition-colors">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-foreground transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
                    <p className="text-primary-foreground/60">
                    © 2025 Jobify Dashboard. Build and Learning Purpose.
                    </p>
                    <small className="text-primary">Develop by SOM Chetra</small>
                </div>
            </div>
        </footer>
    )
}

export default Footer