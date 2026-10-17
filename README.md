# void-ship-commerce-1017

Six-service store: Next storefront + private Next admin, Rust catalog, C pricing/tax, JS cart/orders and JS payment mock. Only storefront should be public. Storefront → orders → catalog/pricing/payment. Native services adapt the supplied test fixture in a NEW repository; original project and repository are untouched.

Synthetic Dev-Void acceptance app. No real accounts or credentials. Mock cookie login is for testing only. All order/payment data is synthetic and in-memory.

Dev compiler compatibility: imports and use-client directives are on separate lines. The initial valid compact syntax triggered import/Flight diagnostics; see external SHIP findings.
