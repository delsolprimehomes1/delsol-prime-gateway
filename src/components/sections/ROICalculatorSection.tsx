
import Section from "@/components/layout/Section";
import InvestmentROICalculator from "@/components/tools/InvestmentROICalculator";

const ROICalculatorSection = () => {
  return (
    <Section id="roi-calculator" padding="xl" background="muted">
      <InvestmentROICalculator />
    </Section>
  );
};

export default ROICalculatorSection;
