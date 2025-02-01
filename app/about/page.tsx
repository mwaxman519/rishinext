"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Box,
  Layout,
  Sparkles,
  Zap,
  RefreshCw,
  Layers,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Layout className="h-6 w-6" />,
    title: "Static Site Generation",
    description: "Lightning-fast page loads with optimized static exports"
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Modern UI Components",
    description: "Beautiful, accessible components powered by shadcn"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Performance Focused",
    description: "Optimized builds and minimal client-side JavaScript"
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "TypeScript Native",
    description: "Full type safety and enhanced developer experience"
  }
];

const techStack = [
  { name: "Next.js 15.1.6", icon: <Box className="h-4 w-4" /> },
  { name: "React 19", icon: <RefreshCw className="h-4 w-4" /> },
  { name: "TypeScript", icon: <Code2 className="h-4 w-4" /> },
  { name: "Tailwind CSS", icon: <Layers className="h-4 w-4" /> }
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="hero-grid" />
        <Container className="relative pt-24 pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="gradient-text text-6xl font-bold tracking-tight mb-6">
              Building the Future
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              A cutting-edge Next.js application designed for performance, 
              scalability, and exceptional developer experience. Experience
              the power of modern web technologies.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="btn-gradient" asChild>
                <Link href="/docs">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/features">
                  View Features
                </Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Features Grid */}
      <Container className="py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="card-hover h-full">
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Tech Stack Section */}
      <section className="bg-muted/50 py-24">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-12 gradient-text">
              Built with Modern Tech
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={itemVariants}
                  className="transform hover:-translate-y-1 transition-transform duration-200"
                >
                  <Badge 
                    variant="secondary"
                    className="px-4 py-2 text-sm flex items-center gap-2 shadow-sm"
                  >
                    {tech.icon}
                    {tech.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="py-24 text-center"
        >
          <h2 className="gradient-text text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us in building the next generation of web applications
          </p>
          <Button size="lg" className="btn-gradient animate-pulse" asChild>
            <Link href="/docs">
              View Documentation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </div>
  );
}