# Calorie per Real PWA

## Product Scope
- App purpose: calculate calories per real while grocery shopping.
- Target platform: iPhone only.
- Audience: single-user personal tool; no other users.

## Core Behavior
- Inputs per item:
  - calories per portion
  - number of portions
  - cost in reais
- Current item ratio is computed live as soon as inputs are valid.
- User can clear the three current-item entry fields with one control without adding to the cart.
- Formula:
  - total calories for item = calories per portion * number of portions
  - calories per real ratio = total calories for item / cost in reais
- User can add current item to a metaphorical cart.
- Cart tracks each added item's calories-per-real ratio.
- User can clear the cart after confirming the action.
- End-of-trip total ratio is computed from cart totals:
  - cart total calories / cart total cost in reais

## System Decisions
- Architecture: static client-side PWA (no backend).
- Data storage: local-only persistence on device for cart state.
- Offline behavior: app shell and assets cached for offline use.
- Viewport behavior: zoom is disabled to mimic native app interaction.
- App icons are delivered as PNG assets for iOS home-screen compatibility.
- Deployment artifact: static `dist/` directory produced by `npm run build`.
