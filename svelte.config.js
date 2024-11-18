import adapter from "@sveltejs/adapter-auto";
import { sveltePreprocess as preprocess } from "svelte-preprocess";
import { phosphorSvelteOptimize as phosphor } from "phosphor-svelte/preprocessor";
import { mdsvex } from "mdsvex";

import gfm from "remark-gfm";
import mdx from "remark-mdx";
import slug from "rehype-slug";
// TODO: remark footnote plugin

import { visit } from "unist-util-visit";

/** @param { number } max */
function headlink(max = 2) {
  /** @param { import("hast").Root } tree */
  return function (tree) {
    visit(tree, "element", (node, _, parent) => {
      const isHeading = "h".repeat(max).split("").map((x, i) => x + ++i).includes(node.tagName);
      if (!isHeading) return;

      const { id } = node.properties;
      if (!id) return;

      if (parent?.tagName === "a") return;

      const { children } = node;

      node.properties.class = "headlink";
      node.children = [{
        type: "element",
        tagName: "a",
        properties: { href: `#${id}` },
        children,
      }];
    });
  };
}

/** @type {import("mdsvex").MdsvexOptions} */
const md = {
  smartypants: {
    backticks: false,
    dashes: "oldschool",
  },
  remarkPlugins: [gfm, mdx],
  rehypePlugins: [slug, headlink],
};

/** @type {import("@sveltejs/kit").Config} */
const config = {
  extensions: [".svelte", ".svx"],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [phosphor(), mdsvex(md), preprocess()],

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
  },
};

export default config;
