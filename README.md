Bootstrap multiselect
=====================

Dual multiselect for bootstrap

## Events

| Event name             | Description                           |
| ---------------------- | ------------------------------------- |
| **bs.ms.select**       | Trigger if select event occurred      |
| **bs.ms.select.all**   | Trigger if select all event occured   |
| **bs.ms.deselect**     | Trigger if deselect event occured     |
| **bs.ms.deselect.all** | Trigger if deselect all event occured |

## Create multiselect

### Javascript code
```javascript
$('#test').multiselect()
    .on('bs.ms.select', function () {
            console.log('selected');
        })
    .on('bs.ms.deselect', function () {
            console.log('deselected');
        });
```

### HTML code

```html
<select id="test" multiple="multiple">
    <option>Select 1</option>
    <option selected="selected">Select 2</option>
    <option>Select 3</option>
    <option>Select 4</option>
    <option>Select 5</option>
    <option selected="selected">Select 6</option>
    <option selected="selected">Select 7</option>
    <option>Select 8</option>
    <option selected="selected">Select 9</option>
    <option>Select 10</option>
    <option>Select 11</option>
    <option>Select 12</option>
    <option>Select 13</option>
    <option>Select 14</option>
    <option>Select 15</option>
    <option>Select 16</option>
</select>
```

## Config

```javascript
{
    language: {
        unselectedFilter: 'Keresés',
        selectedFilter:   'Keresés',
        btn:              {
            select:      '&gt;',
            selectAll:   '&gt;&gt;',
            deselect:    '&lt;',
            deselectAll: '&lt;&lt;'
        }
    },
    class:    {
        wrapper:            'bs-ms-wrapper',
        selectedSelected:   'bs-ms-selected-select',
        unselectedSelected: 'bs-ms-unselected-select'
    }
}
```