---
title: Interactions
---

## Configuration

The following options are available at the top level. They apply to all annotations unless they are overwritten on a per-annotation basis.

| Name | Type | [Scriptable](options#scriptable-options) | Default | Notes
| ---- | ---- | :----: | ---- | ----
| `drawTime` | `string` | Yes | `'afterDatasetsDraw'` | See [drawTime](options#draw-time)
| `dblClickSpeed` | `number` | Yes | `350` | Time to detect a double click in ms.

The following options are available for all annotation types. These options can be specified per annotation, or at the top level which apply to all annotations.

| Name | Type | [Scriptable](options#scriptable-options) | Notes
| ---- | ---- | :----: | ----
| `enter` | `(context, event) => void` | No | Called when the mouse enters the annotation.
| `leave` | `(context, event) => void` | No | Called when the mouse leaves the annotation.
| `click` | `(context, event) => void` | No | Called when a single click occurs on the annotation.
| `dblClick` | `(context, event) => void` | No | Called when a double click occurs on the annotation.
