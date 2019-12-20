<script type="text/html" id="newsTpl">
    {{each data}}
    <li class="new-item-fast"><a href="{{$value.url}}" title="{{$value.title}}">{{$value.title}}</a></li>
    {{/each}}
</script>