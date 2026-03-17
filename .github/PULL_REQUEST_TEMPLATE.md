## Description

<!-- What does this PR do? -->

## Type of change

- [ ] `feat:` New feature (minor version bump)
- [ ] `fix:` Bug fix (patch version bump)
- [ ] `perf:` Performance improvement (patch)
- [ ] `docs:` Documentation only (no release)
- [ ] `refactor:` Code refactor (no release)
- [ ] `test:` Tests only (no release)
- [ ] `chore:` Build / config / deps (no release)
- [ ] `BREAKING CHANGE:` Breaking change (major version bump — add `BREAKING CHANGE:` to commit footer)

## Commit format

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short description>

[optional body]

[optional footer: BREAKING CHANGE: <description>]
```

**Examples:**
- `feat(hosted-fields): add supportedCardBrands prop`
- `fix(venmo): call hasTokenizationResult before tokenize`
- `docs: add 3D Secure chaining example`

## Checklist

- [ ] Tests pass (`npm run test`)
- [ ] Coverage thresholds met (`npm run test:coverage`)
- [ ] TypeScript check passes (`vue-tsc --noEmit`)
- [ ] Build succeeds (`npm run build`)
- [ ] `publint` passes (`npm run lint`)
- [ ] Commit messages follow Conventional Commits
- [ ] If this is a `feat` or `fix`, CHANGELOG will be auto-generated on merge — no manual edit needed
