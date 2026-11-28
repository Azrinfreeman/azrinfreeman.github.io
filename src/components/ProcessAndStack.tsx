import { STACK_GROUPS, WORKFLOW_STEPS } from '../data/portfolio';

export function ProcessAndStack() {
  return (
    <section id="process" className="divider page-section border-t">
      <div className="page-width grid gap-9 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="section-title">How I work</h2>
          <ol className="mt-5 space-y-4" role="list">
            {WORKFLOW_STEPS.map((item) => (
              <li key={item.step} className="grid grid-cols-[auto_1fr] items-start gap-3">
                <span className="section-tint grid size-8 place-items-center rounded-full text-sm font-semibold">{Number(item.step)}</span>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="supporting-text mt-1 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="section-title">Technical stack</h2>
          <dl className="mt-4">
            {STACK_GROUPS.map((group) => (
              <div key={group.label} className="divider border-b py-3">
                <dt className="text-sm font-bold">{group.label}</dt>
                <dd className="supporting-text mt-1 text-sm leading-relaxed">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-5 font-bold">AI-assisted development</h3>
          <p className="supporting-text mt-1 text-sm leading-relaxed">
            I use AI coding agents to draft implementations, then review changes and test the resulting flows.
            TypeScript, React, Node.js and .NET projects marked with an asterisk were built using this workflow.
            For visual assets, I work from your mockups or a component library.
          </p>
        </div>
      </div>
    </section>
  );
}
