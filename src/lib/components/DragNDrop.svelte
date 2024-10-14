<script lang="ts">
  import {
    UploadSimple as FileUpload,
    FileMd as FileMarkdown,
    FileX as FileInvalid,
    X as IconInvalid,
    Check as IconValid,
  } from "phosphor-svelte";

  interface Props {
    name: string;
    required?: boolean;
    accept?: string;

    validate?: (filename: string) => string | void;

    valid?: boolean;
  }

  let { name, required, accept, valid = $bindable(), validate }: Props = $props();

  const defaultInfo = "<b>Choose a File</b> or Drag'n'Drop";
  const defaultIcon = FileUpload;

  let dropper: HTMLLabelElement;
  let input: HTMLInputElement;
  let info: HTMLSpanElement;
  let icon: typeof defaultIcon = $state(defaultIcon);

  function setData(content: string, data?: { icon?: typeof icon, valid?: boolean, focus?: boolean }) {
    info.innerHTML = content;
    icon = data?.icon ?? defaultIcon;

    valid = data?.valid;
    delete dropper.dataset.valid;
    delete dropper.dataset.invalid;
    if (valid !== undefined) {
      valid
        ? dropper.dataset.valid = ""
        : dropper.dataset.invalid = "";
    }

    delete dropper.dataset.dragging;
    if (data?.focus) {
      dropper.dataset.dragging = "";
      return;
    }
  }

  function handleFile(event: Event, file?: string) {
    event.preventDefault();

    if (!file) return setData(defaultInfo);

    const error = validate?.(file);
    if (error) return setData(error, { icon: FileInvalid, valid: false });
    
    setData(file, { icon: FileMarkdown, valid: true });
  }

  function handleDragEnter(event: DragEvent) {
    event.preventDefault();

    const kind = event.dataTransfer?.items?.[0]?.kind;
    kind === "file"
      ? setData("<b>Release</b> to drop", { icon: IconValid, focus: true })
      : setData("Invalid", { icon: IconInvalid, valid: false });
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault();

    setData(defaultInfo);
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<label for="dnd"
  tabindex="0" onkeypress={() => input.click()}
  bind:this={dropper}
  ondragover={(e) => { e.preventDefault(); }}
  ondrop={(e) => handleFile(e, e.dataTransfer?.files?.[0].name)}
  ondragenter={handleDragEnter}
  ondragleave={handleDragLeave}
>
  <svelte:component this={icon} size="4em" weight="light" />
  <div bind:this={info}>{@html defaultInfo}<div>
</label>
<input id="dnd" {name} {required} hidden
  type="file" {accept}
  bind:this={input}
  onchange={(e) => handleFile(e, e.currentTarget.files?.[0].name)}
/>

<style global lang="scss">
  label[for="dnd"] {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 2.5rem;
    gap: 1.5em;

    --border-color: var(--pico-muted-color);
    border: 0.125em solid var(--border-color);
    border-radius: 1rem;

    color: var(--pico-muted-color);

    font-size: 1.425rem;
    text-align: center;

    box-shadow: 0 0 0.125em var(--border-color),
          inset 0 0 0.125em var(--border-color);

    transition:
      border 100ms ease-in,
      color 100ms ease-in;

    * {
      pointer-events: none;
    }

    &:hover, &:focus, &[data-dragging] {
      cursor: pointer;
      outline: none;

      --border-color: var(--pico-primary-hover);
      color: var(--pico-color);
    }

    &[data-valid], &[data-invalid] {
      color: var(--pico-color);
    }

    &[data-valid] {
      --border-color: var(--pico-form-element-valid-border-color);

      &:hover, &:focus {
        --border-color: var(--pico-form-element-valid-active-border-color);
      }
    }

    &[data-invalid] {
      --border-color: var(--pico-form-element-invalid-border-color);

      &:hover, &:focus {
        --border-color: var(--pico-form-element-invalid-active-border-color);
      }
    }
  }
</style>
