# Next.js Static Site Generator with TinaCMS Integration

A cutting-edge Next.js application designed for flexible and efficient web development with advanced export capabilities and comprehensive notification integrations. This template provides automated static builds with TinaCMS integration.

## Features

- Next.js 15.1.6 with App Router
- TinaCMS Integration
- Automated static builds
- Multi-branch deployment strategy
- Webhook-triggered builds
- Comprehensive logging
- Build status notifications (Slack & Teams)
- TypeScript support
- Tailwind CSS styling
- ShadCN UI components

## Prerequisites

Before setting up this template, ensure you have:

1. A GitHub account with repository creation permissions
2. Access to [TinaCMS Cloud](https://app.tina.io)
   - Sign up for a free account if you don't have one
   - Familiarize yourself with TinaCMS basics
3. A [Vercel](https://vercel.com) account
   - Connected to your GitHub account
   - Sufficient deployment credits
4. A [Replit](https://replit.com) account
   - With Git integration enabled
   - Node.js development environment access

## Setup Instructions

### 1. TinaCMS Setup

1. Login to [TinaCMS Cloud](https://app.tina.io)
2. Create a new project using the Vercel starter template

   ![TinaCMS Project Creation](docs/images/tina-create-project.png)

3. Follow the TinaCMS setup wizard to connect with Vercel

   ![TinaCMS Vercel Connection](docs/images/tina-vercel-connect.png)

4. Note down your repository URL
5. Verify TinaCMS dashboard access

   ![TinaCMS Dashboard](docs/images/tina-dashboard.png)

6. Test the content editing interface

### 2. GitHub Repository Configuration

1. In your newly created GitHub repository:
   ```bash
   # Create required branches
   git checkout -b cms
   git push origin cms

   git checkout -b static
   git push origin static

   git checkout -b staging
   git push origin staging
   ```

   ![GitHub Branches](docs/images/github-branches.png)

2. Configure branch protection rules:
   - Go to Settings > Branches
   - Add rule for each branch (main, cms, static, staging)
   - Enable required status checks if needed
   - Set up merge restrictions
   - Configure review requirements if needed

   ![Branch Protection](docs/images/github-branch-protection.png)

### 3. Replit Setup

1. Fork this Replit template
2. Connect your Replit to your GitHub repository:
   - Go to Version Control tab
   - Click "Connect to GitHub"
   - Select your TinaCMS repository
   - Configure the connection

   ![Replit GitHub Connection](docs/images/replit-github-connect.png)

3. Verify the connection:
   - Check if you can see your repository files
   - Ensure you have write access
   - Test a simple commit

### 4. Environment Variables

Set up the following environment variables in your Replit:

```env
GITHUB_TOKEN=your_github_token              # Required for repository access
GITHUB_REPOSITORY=your_username/your_repo   # Format: username/repository
WEBHOOK_SECRET=your_webhook_secret          # Used for webhook verification
SLACK_WEBHOOK_URL=your_slack_webhook_url    # Slack notification webhook URL
TEAMS_WEBHOOK_URL=your_teams_webhook_url  # Microsoft Teams notification webhook URL
```

![Replit Environment Variables](docs/images/replit-env-vars.png)

### 5. Webhook Configuration

1. In your GitHub repository:
   - Go to Settings > Webhooks
   - Add webhook
   - Set Payload URL to your Replit endpoint
   - Set secret to match your `WEBHOOK_SECRET`
   - Select 'Push' events
   - Enable SSL verification

   ![GitHub Webhook Setup](docs/images/github-webhook-setup.png)

2. Test the webhook:
   - Make a small change in TinaCMS
   - Verify the webhook triggers
   - Check build logs in Replit

   ![Webhook Test](docs/images/webhook-test-logs.png)

## Branch Structure

This template uses a four-branch strategy:

- `main`: Contains the TinaCMS Next.js app for live editing
- `cms`: Stores the TinaCMS static build, updates automatically
- `staging`: Development code, manually triggered builds
- `static`: Contains the static build output from Replit

## Build Process & Notifications

- Only schema changes in the `cms` branch trigger automatic builds
- Content-only changes are committed without rebuilding
- Staging builds are manually triggered
- All builds include comprehensive logging
- Real-time build notifications via Slack and Microsoft Teams:
  - Build success/failure status
  - Detailed error reporting
  - Schema change notifications
  - Branch context and timestamps
  - Build logs for debugging

### Setting up Notifications

1. **Slack Setup**:
   - Go to your Slack workspace
   - Create an incoming webhook: App Directory > Create > Incoming Webhooks
   - Save the webhook URL as `SLACK_WEBHOOK_URL` in your environment

2. **Microsoft Teams Setup**:
   - Go to the desired Teams channel
   - Click '...' > Connectors
   - Add or Configure 'Incoming Webhook'
   - Save the webhook URL as `TEAMS_WEBHOOK_URL` in your environment

3. **Verify Setup**:
   - Use the `/api/notifications/test` endpoint to send test notifications
   - Check both Slack and Teams channels for test messages
   - Verify all notification types (success/warning/failure)


## Development Workflow & User Roles

### Content Managers
Content managers work exclusively through the TinaCMS interface:
1. Login to [TinaCMS Cloud](https://app.tina.io)
2. Access your project's editing interface
3. Make content changes through the visual editor
4. Changes are automatically:
   - Committed to the `cms` branch
   - Do not trigger rebuilds for content-only changes
   - Trigger rebuilds only for schema modifications
   - Push built files to GitHub's static branch

![TinaCMS Editing Flow](docs/images/tina-editing-flow.png)

### Developers
Developers work with the codebase:
1. Make code changes in the `staging` branch
2. Test changes locally using `npm run dev`
3. Create pull requests for review
4. Merge approved changes to `main`

### Automated Build Process
The build process is fully automated:
1. Content manager makes changes in TinaCMS
2. Changes are committed to `cms` branch
3. Webhook notifies Replit of changes
4. For schema changes, Replit:
   - Pulls latest content from `cms` branch
   - Builds static site
   - Pushes built files to `static` branch on GitHub
5. Your hosting service (e.g., Vercel) can then deploy from the static branch

### Branch Purposes
- `main`: TinaCMS application code
- `cms`: Content changes from TinaCMS
- `staging`: Development and testing
- `static`: Built static files ready for deployment

## Security Considerations

1. **GitHub Token**:
   - Use a Personal Access Token with minimal permissions
   - Regularly rotate the token
   - Never commit tokens to the repository

2. **Webhook Secret**:
   - Use a strong, random secret
   - Keep the secret secure
   - Change it immediately if compromised

3. **Branch Protection**:
   - Enable branch protection rules
   - Require pull request reviews
   - Set up status checks

## Verification Steps

After completing setup, verify:

1. **TinaCMS Integration**:
   - Can access TinaCMS dashboard
   - Content changes are saved
   - Changes trigger webhooks

2. **Build Process**:
   - Webhooks are received
   - Builds complete successfully
   - Static files are generated

3. **Deployment**:
   - Static files are pushed correctly
   - Vercel deployment succeeds
   - Site is accessible

## Troubleshooting

- **Build Failures**: 
  - Check the logs in Replit's console
  - Verify environment variables
  - Ensure branch permissions are correct

- **Webhook Issues**: 
  - Verify webhook configuration and secrets
  - Check Replit endpoint accessibility
  - Validate payload format

- **Static Build Problems**: 
  - Ensure proper branch structure
  - Verify build script permissions
  - Check for missing dependencies

- **TinaCMS Connection**: 
  - Verify TinaCMS configuration
  - Check API access
  - Validate content schema

## Common Issues

1. **Webhook Not Triggering**:
   - Verify the webhook URL is correct
   - Check the secret matches
   - Ensure the endpoint is accessible

2. **Build Process Fails**:
   - Check for missing dependencies
   - Verify environment variables
   - Review build logs

3. **Content Not Updating**:
   - Clear TinaCMS cache
   - Verify content schema
   - Check branch permissions

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to the staging branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues with:
- Template setup: Open an issue in this repository
- TinaCMS: Contact [TinaCMS Support](https://tina.io/support)
- Replit: Contact [Replit Support](https://replit.com/support)

## Additional Resources

- [TinaCMS Documentation](https://tina.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Replit Documentation](https://docs.replit.com)