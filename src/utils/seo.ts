export function seo({
  title,
  image,
}: {
  title: string
  image?: string
}) {
  const tags = [
    { title },
    { name: "twitter:title", content: title },
    { name: "og:title", content: title },
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "og:image", content: image },
        ]
      : []),
  ]

  return tags
}
