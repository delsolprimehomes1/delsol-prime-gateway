import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Clock, Mic, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShortAnswerSectionProps {
  question?: string;
  shortAnswer: string;
  wordCount?: number;
  voiceSearchReady?: boolean;
  lastUpdated?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export function ShortAnswerSection({
  question,
  shortAnswer,
  wordCount,
  voiceSearchReady = true,
  lastUpdated,
  className,
  variant = 'default'
}: ShortAnswerSectionProps) {
  const actualWordCount = wordCount || shortAnswer.split(' ').length;
  const isOptimalLength = actualWordCount >= 50 && actualWordCount <= 70;

  return (
    <Card className={cn(
      "border-l-4 border-l-primary/60 bg-gradient-to-r from-primary/5 to-transparent",
      variant === 'compact' && "p-4",
      variant === 'featured' && "border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/20",
      className
    )}>
      <div className={cn(
        "space-y-3",
        variant === 'compact' ? "p-3" : "p-6"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className={cn(
            "font-semibold text-foreground flex items-center gap-2",
            variant === 'compact' ? "text-lg" : "text-xl"
          )}>
            <MessageCircle className="w-5 h-5 text-primary" />
            {question ? "Quick Answer" : "Short Answer"}
          </h2>
          
          <div className="flex items-center gap-2">
            {voiceSearchReady && (
              <Badge 
                variant="outline" 
                className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300"
              >
                <Mic className="w-3 h-3 mr-1" />
                Voice Ready
              </Badge>
            )}
            
            {isOptimalLength && (
              <Badge 
                variant="outline" 
                className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Optimized
              </Badge>
            )}
          </div>
        </div>

        {/* Question (if provided) */}
        {question && (
          <h3 className="text-lg font-medium text-muted-foreground">
            {question}
          </h3>
        )}

        {/* Short Answer */}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-foreground leading-relaxed text-base font-medium">
            {shortAnswer}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
          <div className="flex items-center gap-4">
            <span className={cn(
              "flex items-center gap-1",
              isOptimalLength ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"
            )}>
              <Clock className="w-3 h-3" />
              {actualWordCount} words
            </span>
            
            {voiceSearchReady && (
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <Mic className="w-3 h-3" />
                Voice optimized
              </span>
            )}
          </div>
          
          {lastUpdated && (
            <span>
              Updated: {new Date(lastUpdated).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Voice Search Context */}
        {voiceSearchReady && variant !== 'compact' && (
          <div className="text-xs text-muted-foreground italic">
            This answer is optimized for voice assistants like Siri, Google Assistant, and Alexa
          </div>
        )}
      </div>
    </Card>
  );
}

export default ShortAnswerSection;