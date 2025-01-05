import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useCompanyStore } from "@/stores/companyStore";
import { companiesData } from "@/data/companies";
import { StatCard } from "./StatCard";

export const PowerStats = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  return (
    <>
      {selectedCompany?.stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="col-span-1"
        >
          <StatCard
            stat={stat}
            index={index}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        </motion.div>
      ))}
    </>
  );
};