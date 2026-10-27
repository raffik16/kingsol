import {
  BoldFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

// Everything the client can edit on the single-page site. Saving marks the home page
// stale, so the next visit renders the new content without a redeploy.
export const HomePage: GlobalConfig = {
  slug: "home-page",
  hooks: {
    afterChange: [() => revalidatePath("/")],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "about",
          label: "About",
          fields: [
            { name: "heading", type: "text", required: true },
            {
              name: "bio",
              type: "richText",
              required: true,
              editor: lexicalEditor({
                features: [ParagraphFeature(), BoldFeature(), ItalicFeature(), InlineToolbarFeature()],
              }),
            },
            {
              name: "stats",
              type: "array",
              maxRows: 3,
              admin: { description: "The figures under the bio, such as 2018 / Since." },
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
          ],
        },
        {
          name: "music",
          label: "Music",
          fields: [
            { name: "intro", type: "textarea", required: true },
            {
              name: "releases",
              type: "array",
              admin: { description: "Shown in this order, newest first. The first six appear before “Load more”." },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "year", type: "text", required: true },
                {
                  name: "type",
                  type: "select",
                  required: true,
                  options: [
                    { label: "Album", value: "album" },
                    { label: "EP", value: "ep" },
                    { label: "Single", value: "single" },
                  ],
                },
                {
                  name: "spotifyId",
                  label: "Spotify album",
                  type: "text",
                  required: true,
                  admin: { description: "Paste the album’s Spotify link." },
                  // Keep only the album ID from a pasted link like https://open.spotify.com/album/<id>?si=...
                  hooks: { beforeValidate: [({ value }) => value?.match(/album\/(\w+)/)?.[1] ?? value] },
                },
              ],
            },
          ],
        },
        {
          name: "shows",
          label: "Shows",
          fields: [
            { name: "intro", type: "textarea", required: true },
            {
              name: "upcoming",
              type: "array",
              admin: { description: "Listed by date on the site." },
              fields: [
                { name: "venue", type: "text", required: true },
                { name: "start", type: "date", required: true, admin: { date: { pickerAppearance: "dayAndTime" } } },
                { name: "end", type: "date", admin: { date: { pickerAppearance: "dayAndTime" } } },
                {
                  name: "address",
                  type: "group",
                  fields: [
                    { name: "street", type: "text", required: true },
                    { name: "city", type: "text", required: true },
                    { name: "region", label: "State", type: "text", required: true },
                    { name: "postalCode", label: "ZIP code", type: "text", required: true },
                  ],
                },
                { name: "free", label: "Free show", type: "checkbox" },
              ],
            },
          ],
        },
        {
          name: "contact",
          label: "Contact",
          fields: [
            { name: "intro", type: "textarea", required: true },
            { name: "email", type: "email", required: true },
            { name: "location", label: "Based in", type: "text", required: true },
            { name: "booking", type: "text", required: true },
          ],
        },
      ],
    },
  ],
};
