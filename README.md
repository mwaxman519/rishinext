# Next.js Static Site Generator

A cutting-edge Next.js application designed for flexible and efficient web development with advanced export capabilities. This template provides automated static builds with comprehensive notification integrations.

## Features

- Next.js 15.1.6 with App Router
- MDX-based content management
- Multi-branch deployment strategy:
  - `staging`: Development and content schema changes
  - `static`: Content storage and editing
  - `main`: Production-ready code
- Automated content sync between branches
- Build status notifications (Slack & Teams)
- TypeScript support
- Tailwind CSS styling
- ShadCN UI components

## Content Management Workflow

### Branch Structure
- `staging`: Development branch for code changes and content schema updates
- `static`: Content storage branch where all MDX content lives
- `main`: Production-ready application code

### Content Editing
1. Edit MDX files directly in the `content/` directory on the `static` branch
2. Changes trigger automatic builds via GitHub webhooks
3. Content is automatically synced between branches using our built-in services

### Development Workflow
1. Make code changes in `staging`
2. Test changes locally using `npm run dev`
3. Content changes from `static` are automatically merged during builds
4. Deployment scripts handle branch synchronization

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