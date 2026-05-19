import { ImageResponse } from "next/og";

export const size = {
    width: 180,
    height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                        "linear-gradient(135deg, #ff6b35 0%, #ff8b57 50%, #ff9f73 100%)",
                    color: "#ffffff",
                    fontSize: 96,
                    fontWeight: 700,
                    fontFamily: "Arial, sans-serif",
                    borderRadius: 36,
                }}
            >
                R
            </div>
        ),
        size,
    );
}
