import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const More = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <MoreHorizontal className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">More</h1>
          </div>
          <p className="text-muted-foreground">
            Additional features and settings
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="default" size="lg">
            Example 1
          </Button>
          <Button variant="outline" size="lg">
            Example 2
          </Button>
          <Button variant="secondary" size="lg">
            Example 3
          </Button>
        </div>
      </div>
    </div>
  );
};

export default More;