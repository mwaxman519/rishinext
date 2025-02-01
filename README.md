# Next.js Static Site Generator

A cutting-edge Next.js application designed for flexible and efficient web development with advanced export capabilities. This template provides automated static builds with comprehensive notification integrations.

## Features

- Next.js 15.1.6 with App Router
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
2. A [Vercel](https://vercel.com) account
   - Connected to your GitHub account
   - Sufficient deployment credits
3. A [Replit](https://replit.com) account
   - With Git integration enabled
   - Node.js development environment access

## Development Workflow & User Roles

### Developers
Developers work with the codebase:
1. Make code changes in the `staging` branch
2. Test changes locally using `npm run dev`
3. Create pull requests for review
4. Merge approved changes to `main`

### Branch Purposes
- `main`: Application code
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

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to the staging branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues with:
- Template setup: Open an issue in this repository
- Replit: Contact [Replit Support](https://replit.com/support)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Replit Documentation](https://docs.replit.com)