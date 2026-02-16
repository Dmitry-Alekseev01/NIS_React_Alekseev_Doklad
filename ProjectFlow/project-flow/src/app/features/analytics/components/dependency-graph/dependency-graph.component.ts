import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-dependency-graph',
  standalone: true,
  template: `<svg #svg [attr.width]="width" [attr.height]="height" class="graph"></svg>`,
  styles: ['.graph { border: 1px solid #e2e8f0; border-radius: 0.5rem; width: 100%; height: 100%; }']
})
export class DependencyGraphComponent implements OnChanges {
  @ViewChild('svg', { static: true }) svgRef!: ElementRef<SVGSVGElement>;
  @Input() nodes: any[] = [];
  @Input() links: any[] = [];
  @Input() width = 600;
  @Input() height = 400;

  ngOnChanges(changes: SimpleChanges) {
    console.log('DependencyGraph nodes:', this.nodes, 'links:', this.links);
    this.renderGraph();
  }

  private renderGraph() {
    const svg = d3.select(this.svgRef.nativeElement);
    svg.selectAll('*').remove();

    if (!this.nodes.length) {
      svg.append('text')
        .attr('x', this.width / 2)
        .attr('y', this.height / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#64748b')
        .style('font-size', '14px')
        .text('No dependency data');
      return;
    }

    const nodes = this.nodes.map(d => ({ ...d }));
    const links = this.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    const link = svg.append('g')
      .attr('stroke', '#94a3b8')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 8)
      .attr('fill', '#3b82f6')
      .call(d3.drag<any, any>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    node.append('title').text(d => d.name);

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node
        .attr('cx', d => (d as any).x)
        .attr('cy', d => (d as any).y);
    });
  }
}