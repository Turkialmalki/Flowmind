// BlogCard.tsx
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

type CategoryColor = "indigo" | "sky" | "emerald" | "amber" | "purple"

interface BlogCardProps {
  title: string
  excerpt: string
  category: string
  categoryColor: CategoryColor
  date: string
  readTime: string
  imageUrl: string
  imageAlt: string
  postUrl: string
  authorName: string
  authorAvatarUrl: string
  showImage: boolean
  showAuthor: boolean
}

const categoryColorMap: Record<CategoryColor, { bg: string; color: string }> = {
  indigo: { bg: "rgba(91,91,214,0.08)", color: "#5b5bd6" },
  sky: { bg: "rgba(14,165,233,0.08)", color: "#0ea5e9" },
  emerald: { bg: "rgba(5,150,105,0.08)", color: "#059669" },
  amber: { bg: "rgba(217,119,6,0.08)", color: "#d97706" },
  purple: { bg: "rgba(124,58,237,0.08)", color: "#7c3aed" },
}

export default function BlogCard({
  title,
  excerpt,
  category,
  categoryColor,
  date,
  readTime,
  imageUrl,
  imageAlt,
  postUrl,
  authorName,
  authorAvatarUrl,
  showImage,
  showAuthor,
}: BlogCardProps) {
  const cc = categoryColorMap[categoryColor]

  return (
    <a
      href={postUrl}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        border: "1px solid rgba(15,23,42,0.07)",
        borderRadius: "20px",
        overflow: "hidden",
        textDecoration: "none",
        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.03)",
        boxSizing: "border-box",
      }}
      aria-label={`Read article: ${title}`}
    >
      {/* Cover image */}
      {showImage && imageUrl && (
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            background: "#eff1f8",
            flexShrink: 0,
          }}
        >
          <img
            src={imageUrl}
            alt={imageAlt || title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "0",
          flex: 1,
        }}
      >
        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          {category && (
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                background: cc.bg,
                color: cc.color,
              }}
            >
              {category}
            </span>
          )}
          {date && (
            <span
              style={{
                fontSize: "12px",
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                color: "#9ca3af",
              }}
            >
              {date}
            </span>
          )}
          {readTime && (
            <span
              style={{
                fontSize: "12px",
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                color: "#9ca3af",
              }}
            >
              · {readTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            color: "#0a0e1a",
            margin: "0 0 10px",
          }}
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "14px",
            lineHeight: 1.7,
            color: "#6b7280",
            margin: "0 0 20px",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {excerpt}
        </p>

        {/* Author + read more */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "16px",
            borderTop: "1px solid rgba(15,23,42,0.07)",
          }}
        >
          {showAuthor && authorName ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {authorAvatarUrl ? (
                <img
                  src={authorAvatarUrl}
                  alt={authorName}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    background: "#eff1f8",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "rgba(91,91,214,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#5b5bd6",
                  }}
                  aria-hidden="true"
                >
                  {authorName.charAt(0).toUpperCase()}
                </div>
              )}
              <span
                style={{
                  fontSize: "13px",
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  fontWeight: 500,
                  color: "#374151",
                }}
              >
                {authorName}
              </span>
            </div>
          ) : (
            <span />
          )}

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "13px",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontWeight: 600,
              color: "#5b5bd6",
            }}
          >
            Read more
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  )
}

BlogCard.defaultProps = {
  title: "How to Launch Your AI SaaS in 60 Minutes with Framer",
  excerpt:
    "Most founders waste weeks agonizing over landing page design. With the right template and a clear launch checklist, you can go from zero to live before end of day.",
  category: "Growth",
  categoryColor: "indigo" as CategoryColor,
  date: "Apr 10, 2026",
  readTime: "5 min read",
  imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
  imageAlt: "Dashboard analytics on a laptop",
  postUrl: "/blog/post",
  authorName: "Alex Chen",
  authorAvatarUrl: "",
  showImage: true,
  showAuthor: true,
}

addPropertyControls(BlogCard, {
  title: {
    type: ControlType.String,
    title: "Title",
    displayTextArea: true,
    defaultValue: "How to Launch Your AI SaaS in 60 Minutes with Framer",
  },
  excerpt: {
    type: ControlType.String,
    title: "Excerpt",
    displayTextArea: true,
    defaultValue:
      "Most founders waste weeks agonizing over landing page design. With the right template you can go from zero to live before end of day.",
  },
  category: { type: ControlType.String, title: "Category", defaultValue: "Growth" },
  categoryColor: {
    type: ControlType.Enum,
    title: "Category Color",
    options: ["indigo", "sky", "emerald", "amber", "purple"],
    optionTitles: ["Indigo", "Sky", "Emerald", "Amber", "Purple"],
    defaultValue: "indigo",
  },
  date: { type: ControlType.String, title: "Date", defaultValue: "Apr 10, 2026" },
  readTime: { type: ControlType.String, title: "Read Time", defaultValue: "5 min read" },
  showImage: { type: ControlType.Boolean, title: "Show Image", defaultValue: true },
  imageUrl: {
    type: ControlType.Image,
    title: "Cover Image",
    hidden: (props: BlogCardProps) => !props.showImage,
  },
  imageAlt: {
    type: ControlType.String,
    title: "Image Alt",
    defaultValue: "Blog post cover image",
    hidden: (props: BlogCardProps) => !props.showImage,
  },
  postUrl: { type: ControlType.Link, title: "Post URL" },
  showAuthor: { type: ControlType.Boolean, title: "Show Author", defaultValue: true },
  authorName: {
    type: ControlType.String,
    title: "Author Name",
    defaultValue: "Alex Chen",
    hidden: (props: BlogCardProps) => !props.showAuthor,
  },
  authorAvatarUrl: {
    type: ControlType.Image,
    title: "Author Avatar",
    hidden: (props: BlogCardProps) => !props.showAuthor,
  },
})
