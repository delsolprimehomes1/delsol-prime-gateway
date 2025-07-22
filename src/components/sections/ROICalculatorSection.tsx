
import Section from "@/components/layout/Section";
import AdvancedROICalculator from "@/components/tools/AdvancedROICalculator";

const ROICalculatorSection = () => {
  return (
    <Section id="roi-calculator" padding="xl" background="muted" className="px-4 sm:px-6 lg:px-8">
      <AdvancedROICalculator />
    </Section>
  );
};

export default ROICalculatorSection;
