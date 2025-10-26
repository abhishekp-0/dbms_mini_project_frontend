import { Card, Flex, Heading, Text, Progress, Badge } from '@radix-ui/themes';
import { calculateBudgetUtilization, formatCurrency } from '../../utils/helpers';

export const BudgetCard = ({ budget, events }) => {
  const event = events?.find(e => e.id === budget.event_id);
  const allocated = parseFloat(budget.allocated_amount) || 0;
  const spent = parseFloat(budget.spent_amount) || 0;
  const remaining = allocated - spent;
  const utilization = calculateBudgetUtilization(allocated, spent);
  const isOverBudget = spent > allocated;

  return (
    <Card>
      <Flex direction="column" gap="3">
        <Flex justify="between" align="start">
          <Heading size="4">{event?.title || `Event ID: ${budget.event_id}`}</Heading>
          {isOverBudget && <Badge color="red">Over Budget</Badge>}
        </Flex>
        
        <Flex direction="column" gap="2">
          <Flex justify="between">
            <Text size="2" color="gray">Allocated:</Text>
            <Text size="2" weight="bold">{formatCurrency(allocated)}</Text>
          </Flex>
          <Flex justify="between">
            <Text size="2" color="gray">Spent:</Text>
            <Text size="2" weight="bold">{formatCurrency(spent)}</Text>
          </Flex>
          <Flex justify="between">
            <Text size="2" color="gray">Remaining:</Text>
            <Text size="2" weight="bold" color={isOverBudget ? 'red' : 'green'}>
              {formatCurrency(remaining)}
            </Text>
          </Flex>
        </Flex>

        <Progress 
          value={Math.min(utilization, 100)} 
          color={isOverBudget ? 'red' : utilization > 80 ? 'orange' : 'blue'}
        />

        {budget.notes && (
          <Text size="1" color="gray" style={{ fontStyle: 'italic' }}>
            {budget.notes}
          </Text>
        )}
      </Flex>
    </Card>
  );
};
