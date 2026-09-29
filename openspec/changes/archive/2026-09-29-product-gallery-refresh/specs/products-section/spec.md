## MODIFIED Requirements

### Requirement: Single gallery instance across breakpoints
The section SHALL render at most one `ProductGallery` instance — exactly one when the gallery source folder resolves at least one slide, zero when it resolves none — whose position is controlled by CSS order/overlap (not by duplicating the slider per breakpoint), so a single autoplay timer and hydration cost serve all viewports.

#### Scenario: No duplicate sliders
- **WHEN** the page renders at any viewport width with images present in the gallery folder
- **THEN** exactly one gallery region exists in the DOM and in the accessibility tree

#### Scenario: Empty source omits the strip
- **WHEN** the gallery source folder contains no image files
- **THEN** no gallery region, slide, or seam-blur band exists in the DOM or the accessibility tree, the two panels still render, and the empty grid row collapses to zero height
