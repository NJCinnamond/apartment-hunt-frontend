'use client';

import styles from "./page.module.css";
import Map from "@/components/map/map";
import { useRentals } from "@/hooks/useRentals";
import { AnimatedTitle } from "@/components/AnimatedTitle/AnimatedTitle";

export default function Home() {
  const { rentals, isLoading, loadNextBatch } = useRentals();

  return (
    <div>
      <AnimatedTitle />
      <main>
        <div className={styles.mapContainer}>
          {isLoading && rentals.length === 0 ? (
            <div>Loading...</div>
          ) : (
            <Map 
              width="100%" 
              height="100vh" 
              rentals={rentals}
              onNeedMore={loadNextBatch}
            />
          )}
        </div>
      </main>
    </div>
  );
}
