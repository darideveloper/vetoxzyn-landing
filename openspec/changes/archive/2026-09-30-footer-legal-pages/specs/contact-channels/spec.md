## MODIFIED Requirements

### Requirement: WhatsApp as the single phone channel

The system SHALL render the company line `922 223 1006` as the only phone channel, as a `NavLink` in footer `FooterMeta` pointing to `https://wa.me/529222231006` with `target="_blank" rel="noopener"`, display text `922 223 1006`, and a `tel:+529222231006` fallback available from `site-config`. (`ContactLinks` stays an orphan of static spans; header renders no phone.) No `tel:+12345678901` placeholder SHALL remain in `src/`.

#### Scenario: Visitor contacts via WhatsApp

- **WHEN** a visitor clicks the phone number in the footer
- **THEN** a new tab opens `https://wa.me/529222231006`

#### Scenario: No placeholder phone remains

- **WHEN** `src/` is searched for `12345678901`
- **THEN** no matches are found
