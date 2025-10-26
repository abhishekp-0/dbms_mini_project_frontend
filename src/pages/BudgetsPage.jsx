import { useState } from 'react';
import { Flex, Heading, Button, Grid } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { BudgetCard } from '../components/budgets/BudgetCard';
import { BudgetForm } from '../components/budgets/BudgetForm';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useFetch } from '../hooks/useFetch';
import { budgetService } from '../services/budgetService';
import { eventService } from '../services/eventService';

export const BudgetsPage = () => {
  const [formOpen, setFormOpen] = useState(false);

  const { data: budgets, loading, error, refetch } = useFetch(() => budgetService.getBudgets());
  const { data: events } = useFetch(() => eventService.getEvents());

  const handleCreateBudget = async (budgetData) => {
    await budgetService.createBudget(budgetData);
    refetch();
  };

  if (loading) {
    return <LoadingSpinner message="Loading budgets..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <Flex direction="column" gap="6">
      <Flex justify="between" align="center">
        <Heading size="8">Budgets</Heading>
        <Button onClick={() => setFormOpen(true)}>
          <Plus size={16} /> Create Budget
        </Button>
      </Flex>

      <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
        {budgets?.map(budget => (
          <BudgetCard key={budget.id} budget={budget} events={events} />
        ))}
      </Grid>

      <BudgetForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreateBudget}
        events={events}
      />
    </Flex>
  );
};
