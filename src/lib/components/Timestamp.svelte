<script lang="ts">
  interface Props {
    date: any;
  };

  const { date }: Props = $props();

  const pretty = (date: any) => new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
</script>

<small>{pretty(date)}</small>
