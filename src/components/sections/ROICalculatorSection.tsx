
import Section from "@/components/layout/Section";
import InvestmentROICalculator from "@/components/tools/InvestmentROICalculator";

const ROICalculatorSection = () => {
  return (
    <Section id="roi-calculator" padding="xl" background="muted" className="px-4 sm:px-6 lg:px-8">
      <InvestmentROICalculator />
    </Section>
  );
};

export default ROICalculatorSection;
