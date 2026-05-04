"use client";

import { MainNavbar } from "@/components/MainNavbar";
import styles from "./notepad.module.css";

export default function CareersPage() {
  return (
    <div>
      <div className={styles.page}>
        <MainNavbar />

        <main className={styles.main}>
          <div className={styles.notepadWrapper}>
            <img
              src="/imgs/careers/tape.png"
              alt=""
              className={styles.tape}
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <img
              src="/imgs/careers/coffee-stain.png"
              alt=""
              className={styles.coffeeStain}
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <img
              src="/imgs/careers/pencil.png"
              alt=""
              className={styles.pencil}
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <img
              src="/imgs/careers/happyemoji.jpg"
              alt=""
              className={styles.happyEmoji}
              draggable={false}
            />

            <div className={styles.spiralBinding}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={styles.spiralRing} />
              ))}
            </div>

            <div className={styles.paper}>
              <div
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                className={styles.content}
              >
                {`JOB APPLICATION

if ur a furry who goes to UCLA or USC, then u in nigga 




go have fun with bun, crab, and kobi in the city of angels!!!
`}
              </div>
            </div>
          </div>

          <div className={styles.stickyRow}>
            <div
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              className={`${styles.sticky} ${styles.stickyPink}`}
            >
              {"Check out my Twitter\n\n"}
              <a
                href="https://x.com/boatsushii"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://x.com/boatsushii",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                style={{
                  color: "inherit",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                @boatsushii
              </a>
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              className={`${styles.sticky} ${styles.stickyBlue}`}
            >
              {`Akogeno from UCSC and Brandon from Springracks can fuck off`}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              className={`${styles.sticky} ${styles.stickyGreen}`}
            >
              {`I have no idea what to put here`}
            </div>
          </div>
        </main>

        <div className={styles.neoFooter}></div>
      </div>
    </div>
  );
}
