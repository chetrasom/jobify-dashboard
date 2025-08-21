"use client";

import { Search, Target, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const Features = () => {
    return (
        <section id="features" className="py-20 px-4 bg-accent">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        Why Choose Jobify?
                    </h3>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[var(--font-source-sans)]">
                        We make job searching simple, efficient, and successful with our innovative platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <Card className="border-border hover:shadow-lg transition-shadow">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                                <Search className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-xl">Easy Application Process</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-center font-[var(--font-source-sans)] leading-relaxed">
                                Apply to multiple jobs with one click. Our streamlined process saves you time and increases your
                                chances of success.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-border hover:shadow-lg transition-shadow">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                                <Target className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="font-[var(--font-playfair)] text-xl">Tailored Job Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-center font-[var(--font-source-sans)] leading-relaxed">
                                Finds jobs that perfectly align with your skills, experience, and
                                career goals.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-border hover:shadow-lg transition-shadow">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-xl">Employer Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-center font-[var(--font-source-sans)] leading-relaxed">
                                Get detailed company information, culture insights, and employee reviews to make informed career
                                decisions.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Features