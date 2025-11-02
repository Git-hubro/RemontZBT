import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Router, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <TooltipProvider>
          <Router base={import.meta.env.BASE_URL}>
            <Header />
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/portfolio/:id" component={ProjectDetail} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </Router>
          <Toaster />
        </TooltipProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
