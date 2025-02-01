import { Container } from "@/components/layout/container";

export default function DocsPage() {
  return (
    <Container>
      <div className="py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Documentation</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2>Getting Started</h2>
            <p>
              Welcome to our modern web application documentation. This guide will help you understand
              how to use and customize the application to meet your needs.
            </p>

            <h3>Features</h3>
            <ul>
              <li>Modern Next.js architecture with App Router</li>
              <li>Type-safe development with TypeScript</li>
              <li>Beautiful UI components with Tailwind CSS</li>
              <li>Responsive design for all devices</li>
            </ul>

            <h2>Configuration</h2>
            <p>
              The application can be configured through environment variables and the
              configuration files in the project root.
            </p>

            <h2>Deployment</h2>
            <p>
              Deploy your application using the static export feature or through a Node.js
              server with server-side rendering support.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
