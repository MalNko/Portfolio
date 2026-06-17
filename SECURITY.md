# Security Policy - Portfolio Website

## Best Practices

### Environment Configuration
- Never commit `.env` files
- Use `.env.example` as template
- Rotate secrets regularly

### Dependencies
- Run `npm audit` before deployment
- Keep packages updated
- Monitor security advisories

### Content Security
- Use HTTPS only
- Implement CSP headers
- Sanitize user inputs
- Validate all data

### Deployment
- Enable security headers
- Configure CORS properly
- Use strong CSP policies
- Enable rate limiting

## Reporting Issues

For security concerns, contact directly rather than creating public issues.
